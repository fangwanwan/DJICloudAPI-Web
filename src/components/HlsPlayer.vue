<template>
  <div class="flex-column flex-justify-center flex-align-center" style="height: 100%; width: 100%">
    <video
      id="hls-video"
      controls
      width="720"
      height="480"
      ref="videoPlayer"
      style="background: #000"
    ></video>
    <div style="margin-top: 20px;">
      <a-input v-model:value="hlsUrl" style="width: 400px" placeholder="请输入HLS(m3u8)地址" />
      <a-button type="primary" class="ml10" @click="playHls">播放</a-button>
      <a-button type="default" class="ml10" @click="refreshVideo">刷新</a-button> <!-- 添加刷新按钮 -->
      <a-select v-model:value="selectedPresetIndex" style="width: 200px; margin-left: 10px;" @change="selectPresetStream">
        <a-select-option v-for="(stream, index) in presetStreams" :key="index" :value="index">
          {{ stream.name }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hls from 'hls.js'

const videoPlayer = ref<HTMLVideoElement | null>(null)
const hlsUrl = ref('http://localhost:8080/live/v1.m3u8')
let hls: Hls | null = null

// 预设视频流列表
const presetStreams = [
  {
    name: 'hls_01#1',
    url: 'http://localhost:8080/live/v1.m3u8',
    description: '演示视频流，低分辨率'
  },
  {
    name: 'hls_02#2',
    url: 'http://localhost:8080/stream.m3u8',
    description: '演示视频流，中等分辨率'
  },
  {
    name: 'rtmp流#3',
    url: 'rtmp://localhost/live/v1',
    description: '演示视频流，高分辨率'
  }
]

// 当前选择的预设流索引
const selectedPresetIndex = ref(-1)

function playHls () {
  const video = videoPlayer.value
  if (!video) return
  if (hls) {
    hls.destroy()
    hls = null
  }
  if (Hls.isSupported()) {
    hls = new Hls()
    hls.loadSource(hlsUrl.value)
    hls.attachMedia(video)
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = hlsUrl.value
  }

  // 确保视频元素存在且可以播放
  if (video) {
    video.play().catch((error) => {
      console.error('自动播放被阻止，请手动点击播放', error)
    })
  }
}

function refreshVideo () {
  if (hls) {
    hls.destroy()
    hls = null
  }
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
    videoPlayer.value.load()
  }
  playHls() // 重新加载并播放视频
}

// 选择预设流
function selectPresetStream (index: number) {
  const stream = presetStreams[index]
  if (stream) {
    hlsUrl.value = stream.url
    playHls()
    selectedPresetIndex.value = index
  }
}
</script>
