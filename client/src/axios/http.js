import axios from "axios";
import { ElMessage, ElLoading } from 'element-plus'



let loading;
// 加载动画
function startLoading() {
    const options = {
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0,7)'
    };
    loading = ElLoading.service(options);
}

// 结束动画
function endLoading() {
    loading.close();
}

// 请求拦截
axios.interceptors.request.use((config) => {
    // 发送请求时，加载动画
    console.log('发送请求！');
    startLoading();

    // 在请求登录接口时，检查token是否存在
    if (localStorage.eleToken) {
        // 设置统一的请求头
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
}, (error) => {
    // 请求错误，返回Promise拒绝态
    return Promise.reject(error);
})


// 响应拦截
axios.interceptors.response.use(function (response) {
    // 服务端响应了数据，立马停止加载动画
    console.log('响应请求！');
    endLoading();
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 提示错误信息
    console.log('响应请求失败！', error);
    ElMessage.error(error.response.data);
    endLoading();

    // 如果token失效
    const { status } = error.response;
    if (status == 401) {
        ElMessage.error('token失效！请重新登录！');
        // 清除本地旧的token
        localStorage.removeItem('eleToken');
        // 跳转回登陆界面，重新登录
        this.$router.push('/login');
    }

    return Promise.reject(error);
});

export default axios;