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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Hls from 'hls.js'

const videoPlayer = ref<HTMLVideoElement | null>(null)
const hlsUrl = ref('http://localhost:8080/stream.m3u8')
let hls: Hls | null = null

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
}
</script>

<style scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-justify-center {
  justify-content: center;
}
.flex-align-center {
  align-items: center;
}
</style>
