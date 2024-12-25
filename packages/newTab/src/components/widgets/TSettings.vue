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
import TMenu from '@/components/TMenu.vue'
import TMenuDivider from '@/components/TMenuDivider.vue'
import TMenuItem from '@/components/TMenuItem.vue'
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
        <TMenu title="Settings">
          <TMenuDivider>General</TMenuDivider>
          <TMenuItem to="#" active>
            <RiBookmark3Line class="w-6 h-6" />
            Bookmarks
          </TMenuItem>
          <TMenuItem to="#">
            <RiTimeLine class="w-6 h-6" />
            Clock
          </TMenuItem>
          <TMenuDivider>Widgets</TMenuDivider>
          <TMenuItem to="#">
            <RiArticleLine class="w-6 h-6" />
            Hackernews
          </TMenuItem>
          <TMenuItem to="#">
            <RiStackLine class="w-6 h-6" />
            Scryfall
          </TMenuItem>
          <TMenuItem to="#">
            <RiAlarmLine class="w-6 h-6" />
            Alarmclock
          </TMenuItem>
        </TMenu>

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
