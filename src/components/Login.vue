<template>
    <el-dialog v-model="dialogTableVisible" title="Shipping address" :width="600">
        <el-form :model="form">
            <el-form-item label="phone" :label-width="140">
                <el-input autocomplete="on" v-model="form.phone" />
            </el-form-item>
            <el-form-item label="password" :label-width="140">
                <el-input autocomplete="on" v-model="form.password" type="password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogTableVisible = false">Cancel</el-button>
                <el-button type="primary" @click="submitForm">Confirm</el-button>
            </span>
        </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { loginByCellphone, loginStatus } from '@/api/user'
import { defineUserStore } from '@/store/index'
const userStore = defineUserStore()

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['update:visible'])
const dialogTableVisible = computed({
    get() {
        return props.visible
    },
    set(val) {
        emit('update:visible', val)
    }
})

const form = reactive({
    password: '',
    phone: '',
})
_loginStatus()
const submitForm = () => {
    loginByCellphone(form).then(() => {
        _loginStatus()
    })
}
function _loginStatus() {
    loginStatus().then(res => {
        userStore.user = res
    })
}
</script>
<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
