<template>
  <div class="flex-column flex-justify-start flex-align-center">
    <router-link
      style="width: 90%; margin: auto;"
      v-for="item in options"
      :key="item.key"
      :to="item.path"
      :class="{
        'menu-item': true,
      }"
    >
    <a-button
      class="mt10"
      style="width:100%;"
      type="primary"
      @click="selectLivestream(item.routeName)"
      >{{ item.label }}</a-button
    >
    </router-link>
    <a-button
      class="mt10 livestream-btn"
      type="primary"
      @click="openHlsPlayer"
    >HLS Live</a-button>
    <a-button
      class="mt10 livestream-btn"
      type="primary"
      @click="openFlvPlayer"
    >FLV Live</a-button>
  </div>
  <div class="live" v-if="showLive" v-drag-window>
    <div style="height: 40px; width: 100%" class="drag-title"></div>
    <a style="position: absolute; right: 10px; top: 10px; font-size: 16px; color: white;" @click="() => root.$router.push('/' + ERouterName.LIVESTREAM)"><CloseOutlined /></a>
    <router-view :name="routeName" />
  </div>
  <div class="hls-live-modal" v-if="hlsPlayerVisible" v-drag-window>
    <div style="height: 40px; width: 100%" class="drag-title"></div>
    <a style="position: absolute; right: 10px; top: 10px; font-size: 16px; color: white;" @click="closeHlsPlayer"><CloseOutlined /></a>
    <HlsPlayer />
  </div>
  <div class="flv-live-modal" v-if="flvPlayerVisible" v-drag-window>
    <div style="height: 40px; width: 100%" class="drag-title"></div>
    <a style="position: absolute; right: 10px; top: 10px; font-size: 16px; color: white;" @click="closeFlvPlayer"><CloseOutlined /></a>
    <FlvPlayer />
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { getRoot } from '/@/root'
import { ERouterName } from '/@/types'
import FlvPlayer from '../../../components/FlvPlayer.vue'
const root = getRoot()
const routeName = ref<string>('LiveOthers')
const showLive = ref<boolean>(root.$route.name === ERouterName.LIVING)

const options = [
  { key: 0, label: 'Agora Live', path: '/' + ERouterName.LIVESTREAM + '/' + ERouterName.LIVING, routeName: 'LiveAgora' },
  { key: 1, label: 'RTMP/GB28181 Live', path: '/' + ERouterName.LIVESTREAM + '/' + ERouterName.LIVING, routeName: 'LiveOthers' }
]

const hlsPlayerVisible = ref(false)
function openHlsPlayer () {
  hlsPlayerVisible.value = true
  showLive.value = false
  flvPlayerVisible.value = false
}
function closeHlsPlayer () {
  hlsPlayerVisible.value = false
}

const flvPlayerVisible = ref(false)
function openFlvPlayer () {
  flvPlayerVisible.value = true
  showLive.value = false
  hlsPlayerVisible.value = false
}
function closeFlvPlayer () {
  flvPlayerVisible.value = false
}

const selectLivestream = (route: string) => {
  showLive.value = root.$route.name === ERouterName.LIVING
  routeName.value = route
  hlsPlayerVisible.value = false
  flvPlayerVisible.value = false
}

onMounted(() => {
  watch(() => root.$route.name, data => {
    showLive.value = data === ERouterName.LIVING
  },
  {
    deep: true
  })
})
</script>

<style lang="scss">
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
.live {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 10px;
  margin-left: 345px;

  text-align: center;
  width: 800px;
  height: 720px;
  background: #232323;
}
.hls-live-modal {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  text-align: center;
  width: 800px;
  height: 540px;
  background: #232323;
}
.flv-live-modal {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  text-align: center;
  width: 800px;
  height: 540px;
  background: #232323;
}
.livestream-btn {
  width: 90%;
  min-width: 120px;
  max-width: 300px;
  height: 38px;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
