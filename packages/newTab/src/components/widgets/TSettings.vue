<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  RiAlarmLine,
  RiArticleLine,
  RiBookmark3Line,
  RiEqualizerLine,
  RiTimeLine,
  RiStackLine,
} from '@remixicon/vue'

import TButton from '@/components/TButton.vue'
import TModal from '@/components/TModal.vue'

const settingsModal = ref(false)
</script>

<template>
  <TButton block variant="secondary" size="lg" @click="settingsModal = true">
    <RiEqualizerLine class="w-6 h-6" />
    Customize
  </TButton>

  <TModal flush :isOpen="settingsModal" size="lg" @close="settingsModal = false">
    <template #content>
      <div class="flex gap-8">
        <aside class="z-0 flex flex-col w-64 pb-2 bg-gray-900 shadow-none" tabindex="-1">
          <div class="flex items-center justify-between p-6">
            <div class="flex items-center gap-3">
              <h3 class="text-xl font-semibold drawer-title">Settings</h3>
            </div>
          </div>
          <div class="px-2 overflow-x-hidden overflow-y-auto text-base grow">
            <ul class="flex flex-col flex-wrap gap-0.5 rounded-lg">
              <div
                class="px-4 py-6 divider text-base-content/50 mt-0.5 flex items-center text-sm leading-5 h-4 whitespace-nowrap text-gray-500"
              >
                General
              </div>
              <li class="flex flex-col flex-wrap items-stretch shrink-0">
                <a
                  href="#"
                  class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
                >
                  <RiBookmark3Line class="w-6 h-6" />
                  Bookmarks
                </a>
              </li>
              <li class="flex flex-col flex-wrap items-stretch shrink-0">
                <a
                  href="#"
                  class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
                >
                  <RiTimeLine class="w-6 h-6" />
                  Clock
                </a>
              </li>
              <div
                class="px-4 py-6 divider text-base-content/50 mt-0.5 flex items-center text-sm leading-5 h-4 whitespace-nowrap text-gray-500"
              >
                Widgets
              </div>
              <li class="flex flex-col flex-wrap items-stretch shrink-0">
                <a
                  href="#"
                  class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
                >
                  <RiArticleLine class="w-6 h-6" />
                  Hackernews
                </a>
              </li>
              <li class="flex flex-col flex-wrap items-stretch shrink-0">
                <a
                  href="#"
                  class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
                >
                  <RiStackLine class="w-6 h-6" />
                  Scryfall
                </a>
              </li>
              <li class="flex flex-col flex-wrap items-stretch shrink-0">
                <a
                  href="#"
                  class="flex items-center gap-2 px-4 rounded-md py-[0.625rem] transition-all duration-200 text-balance hover:bg-orange-700/25"
                >
                  <RiAlarmLine class="w-6 h-6" />
                  Alarmclock
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div class="mt-6">
          <p>Settings!</p>
          <ul class="pl-4">
            <li class="list-disc">
              Widgets
              <ul class="pl-4">
                <li class="list-disc">Bookmarks, only if not using Chrome bookmarks</li>
                <li class="list-disc">
                  Hackernews
                  <ul class="pl-4">
                    <li class="list-disc">Default Story Sort</li>
                    <li class="list-disc">
                      Auto Refresh Interval? Probably not as we want to refresh on focus
                    </li>
                    <li class="list-disc">??</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </TModal>
</template>
