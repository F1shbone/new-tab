<script setup lang="ts">
import { ref, shallowRef } from 'vue'
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

import BookmarkSettings from '@/components/settings/Bookmarks.vue'
import ClockSettings from '@/components/settings/Clock.vue'
import HackernewsSettings from '@/components/settings/Hackernews.vue'
import ScryfallSettings from '@/components/settings/Scryfall.vue'
import AlarmclockSettings from '@/components/settings/Alarmclock.vue'

const settingsModal = ref(false)
const active = shallowRef(BookmarkSettings)
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
          <TMenuItem :active="active === BookmarkSettings" @click="active = BookmarkSettings">
            <RiBookmark3Line class="w-6 h-6" />
            Bookmarks
          </TMenuItem>
          <TMenuItem :active="active === ClockSettings" @click="active = ClockSettings">
            <RiTimeLine class="w-6 h-6" />
            Clock
          </TMenuItem>
          <TMenuDivider>Widgets</TMenuDivider>
          <TMenuItem :active="active === HackernewsSettings" @click="active = HackernewsSettings">
            <RiArticleLine class="w-6 h-6" />
            Hackernews
          </TMenuItem>
          <TMenuItem :active="active === ScryfallSettings" @click="active = ScryfallSettings">
            <RiStackLine class="w-6 h-6" />
            Scryfall
          </TMenuItem>
          <TMenuItem :active="active === AlarmclockSettings" @click="active = AlarmclockSettings">
            <RiAlarmLine class="w-6 h-6" />
            Alarmclock
          </TMenuItem>
        </TMenu>

        <div class="py-8 pr-8 overflow-y-auto grow h-[60svh]">
          <component :is="active" />
        </div>
      </div>
    </template>
  </TModal>
</template>
