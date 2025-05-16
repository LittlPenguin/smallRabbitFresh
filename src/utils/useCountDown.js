import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

// 计时器
export const useCountDown = () => {
    let timer = null
    const time = ref(0)
    // 格式化时间
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 开始倒计时
    const start = (current) => {
        time.value = current
        timer = setInterval(() => {
            time.value--
        }, 1000);
    }

    onUnmounted(async () => {
        if (timer) {
            clearInterval(timer)
        }
    })
    return { formatTime, start }
}
