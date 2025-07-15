<template>
  <div>
    <video
      id="video"
      controls
      width="320"
      height="180"
      ref="videoPlayer"
      style="background: #000"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Hls from 'hls.js'

const videoPlayer = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  const video = videoPlayer.value
  const videoSrc = 'http://localhost:8080/stream.m3u8' // 你的 HLS 地址

  if (Hls.isSupported() && video) {
    const hls = new Hls()
    hls.loadSource(videoSrc)
    hls.attachMedia(video)
  } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = videoSrc
  }
})
</script>
