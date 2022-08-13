<template>
  <el-dialog
    v-model="dialogTableVisible"
    title=""
    :width="620"
    custom-class="login-dialog-conatner"
  >
    <div class="login-container">
      <div class="left-container">
        <div class="label">扫描二维码登陆</div>
        <div class="qr-container">
          <div v-if="[800, 802].includes(qrStatusCode)" class="qr-status">
            <span
              v-if="qrStatusCode === 800"
              class="refresh"
              @click="loginQrCreateTask"
            >
              <div>
                <el-icon class="icon">
                  <Refresh />
                </el-icon>
              </div>
              二维码过期
            </span>
            <span v-if="qrStatusCode === 802" class="wait">
              <div>
                <el-icon class="wait icon">
                  <CircleCheck />
                </el-icon>
              </div>
              <p>扫码成功</p>
              <p>请在手机登陆</p>
            </span>
          </div>
          <el-image :src="qrimg" fit="cover"> </el-image>
        </div>
      </div>
      <div class="right-container">
        <div class="label">
          <span :class="{ isActive: !loginModel }" @click="loginModel = 0">
            密码登陆
          </span>
          <el-divider direction="vertical" />
          <span :class="{ isActive: loginModel }" @click="loginModel = 1">
            短信登陆
          </span>
        </div>
        <el-form ref="formRef" :model="form" :show-message="false">
          <!-- 账号密码登陆 -->
          <div v-if="!loginModel">
            <el-form-item prop="phone" required>
              <el-input
                v-model="form.phone"
                autocomplete="on"
                placeholder="请输入账号"
              >
                <template #prepend>账号</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password" required>
              <el-input
                v-model="form.password"
                autocomplete="on"
                type="password"
                placeholder="请输入密码"
              >
                <template #prepend>密码</template>
              </el-input>
            </el-form-item>
          </div>

          <!-- 短信登陆 -->
          <div v-if="loginModel">
            <el-form-item
              prop="phone"
              required
              :rules="[{ pattern: /^1[3456789]\d{9}$/, trigger: 'blur' }]"
            >
              <el-input
                v-model.number="form.phone"
                autocomplete="on"
                placeholder="请输入手机号"
              >
                <template #prepend>
                  <el-select
                    v-model="form.countrycode"
                    placeholder="Select"
                    style="width: 82px"
                  >
                    <el-option label="+86" :value="86" />
                  </el-select>
                </template>
                <template #append>
                  <span v-if="waitCaptchaTime > 0">
                    {{ waitCaptchaTime }}
                  </span>
                  <el-button
                    v-else
                    :disabled="!!waitCaptchaTime"
                    :style="{ margin: ' 0 auto', color: '#409eff' }"
                    type="primary"
                    @click="hanlderCaptchaSent"
                  >
                    获取验证码
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="captcha" required>
              <el-input v-model="form.captcha" placeholder="请输入验证码">
                <template #prepend>验证码</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button @click="submitForm">登陆</el-button>
        </span>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, watch, ref } from 'vue';
import {
  loginByCellphone,
  loginStatus,
  loginQrCreate,
  qrCheck,
  captchaSent,
} from '@/api/user';
import { defineUserStore } from '@/store/index';
import { Refresh, CircleCheck } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import type { FormInstance } from 'element-plus';

import md5 from 'js-md5';
const userStore = defineUserStore();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible']);
const dialogTableVisible = computed({
  get() {
    return props.visible;
  },
  set(val) {
    emit('update:visible', val);
  },
});
const formRef = ref<FormInstance>();
const form = reactive({
  password: localStorage.getItem('p') || '',
  phone: localStorage.getItem('u') || '',
  countrycode: 86,
  captcha: '',
});

const { qrimg, qrStatusCode, loginQrCreateTask, clearQrTask } = useQr();
const loginModel = ref(0);

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid, fields) => {
    if (valid) {
      execLogin();
    } else {
      console.log('error submit!', fields);
    }
  });
};

function execLogin() {
  let params: loginTypes = {} as loginTypes;
  if (loginModel.value === 0) {
    params = {
      phone: form.phone,
      md5_password: md5(form.password),
    };
  } else if (loginModel.value === 1) {
    params = {
      phone: form.phone,
      captcha: form.captcha,
      countrycode: form.countrycode,
    };
  }
  loginByCellphone(params)
    .then(() => {
      emit('update:visible', false);
      // 查询登陆状态
      getLoginStatus();
      ElMessage.success('登陆成功！');
    })
    .catch(() => {
      ElMessage.error('登陆失败！');
    });
}

const waitCaptchaTime = ref(0);
let timer: any = null;
// 验证码
const hanlderCaptchaSent = () => {
  if (!/^1[3456789]\d{9}$/.test(form.phone)) {
    ElMessage.warning('号码格式不正确');
    return;
  }
  const params = {
    phone: form.phone,
  };
  captchaSent(params).then(() => {
    ElMessage.success('验证码已发送');
    waitCaptchaTime.value = 60;
    timer = setInterval(() => {
      if (timer && waitCaptchaTime.value <= 0) {
        clearInterval(timer);
      }
      waitCaptchaTime.value--;
    }, 1000);
  });
};

// 二维码登陆
function useQr() {
  const qrimg = ref('');
  const qrStatusCode = ref(0);
  let check: any = null;
  watch(dialogTableVisible, (val) => {
    if (val) {
      loginQrCreateTask();
    }
  });

  function loginQrCreateTask() {
    clearQrTask();
    loginQrCreate().then((res: any) => {
      qrimg.value = res.qrimg;
      qrCheckTask(res.key);
    });
  }

  function qrCheckTask(key: string) {
    // 800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功
    //每三秒check一次
    check = setInterval(async () => {
      const data: any = await qrCheck(key);
      qrStatusCode.value = data.code;
      if (data.code == 800) {
        clearInterval(check);
      }
      if (data.code == 803) {
        clearInterval(check);
        emit('update:visible', false);
        getLoginStatus();
      }
    }, 3000);
  }

  function clearQrTask() {
    check && clearInterval(check);
  }

  return {
    qrimg,
    qrStatusCode,
    loginQrCreateTask,
    clearQrTask,
  };
}

function getLoginStatus() {
  loginStatus().then((res) => {
    clearQrTask();
    userStore.user = res;
  });
}
</script>

<style scoped lang="less">
.login-container {
  display: flex;

  .right-container {
    flex: 1;
    padding: 0 40px;
    border-left: 1px solid #e1e1e1;
    margin-left: 20px;
  }

  .right-container,
  .left-container {
    text-align: center;

    .label {
      margin-bottom: 15px;

      > span {
        cursor: pointer;
        padding: 0 10px;
      }

      .isActive {
        color: #fff;
      }
    }
  }
}

.left-container {
  .qr-container {
    position: relative;
    width: 150px;
    margin: 0 auto;
    border: 1px solid #e1e1e1;

    .qr-status {
      z-index: 3;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .icon {
        font-size: 25px;
      }

      .wait {
        .icon {
          color: green;
        }

        p {
          margin: 0;
          font-size: 12px;
        }
      }
    }
  }
}

.right-container {
  .el-button--text {
    margin-right: 15px;
  }

  .el-select {
    width: 100%;
  }

  .el-input {
    width: 100%;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }
}
</style>
