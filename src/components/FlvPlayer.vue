<template>
  <div class="flex-column flex-justify-center flex-align-center" style="height: 100%; width: 100%">
    <video
      id="flv-video"
      controls
      width="720"
      height="480"
      ref="videoPlayer"
      style="background: #000"
    ></video>
    <div style="margin-top: 20px;">
      <a-input v-model:value="flvUrl" style="width: 400px" placeholder="请输入HTTP-FLV地址" />
      <a-button type="primary" class="ml10" @click="playFlv">播放</a-button>
      <a-button type="default" class="ml10" @click="refreshVideo">刷新</a-button>
      <a-button type="dashed" class="ml10" @click="resetToDefault">恢复默认</a-button>
    </div>
    <div style="margin-top: 10px; color: #aaa; font-size: 13px;">
      默认地址: <span style="color:#4fc3f7">http://localhost:8080/live/v1.flv</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import flvjs from 'flv.js'

const DEFAULT_FLV_URL = 'http://localhost:8080/live/v1.flv'
const videoPlayer = ref<HTMLVideoElement | null>(null)
const flvUrl = ref(DEFAULT_FLV_URL)
let flvPlayer: any = null

function playFlv () {
  const video = videoPlayer.value
  if (!video) return
  if (flvPlayer) {
    flvPlayer.unload()
    flvPlayer.detachMediaElement()
    flvPlayer.destroy()
    flvPlayer = null
  }
  if (flvjs.isSupported()) {
    flvPlayer = flvjs.createPlayer({
      type: 'flv',
      url: flvUrl.value
    })
    flvPlayer.attachMediaElement(video)
    flvPlayer.load()
    flvPlayer.play()
  } else {
    alert('FLV.js is not supported in this browser.')
  }
}

function refreshVideo () {
  if (flvPlayer) {
    flvPlayer.unload()
    flvPlayer = null
  }
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
    videoPlayer.value.load()
  }
  playFlv()
}

function resetToDefault () {
  flvUrl.value = DEFAULT_FLV_URL
  playFlv()
}

onMounted(() => {
  playFlv()
})

onBeforeUnmount(() => {
  if (flvPlayer) {
    flvPlayer.unload()
    flvPlayer.detachMediaElement()
    flvPlayer.destroy()
    flvPlayer = null
  }
})
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
