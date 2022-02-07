<template>
  <div id="app">
    <week-time-picker v-model="weektime" />
    <div style="max-width: 400px; margin-top: 50px">
      <week-time-picker v-model="weektime" />
    </div>
    <div class="value-display">
      <div class="title">
        value:
      </div>
      <pre v-html="display" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'highlight.js/styles/default.css';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

export default Vue.extend({
  data() {
    return {
      weektime: {
        mon: ['08:00-12:00', '14:00-18:30'],
        tue: ['08:00-12:00'],
        wed: ['08:00-12:00'],
        thu: ['08:00-12:00'],
        fri: ['08:00-12:00'],
        sat: ['08:00-12:00'],
        sun: ['08:00-12:00'],
      },
    };
  },
  computed: {
    display(): string {
      const str = JSON.stringify(this.weektime, null, 2);
      return hljs.highlight(str, {
        language: 'json'
      }).value;
    }
  }
});
</script>

<style lang="scss" scoped>
.value-display {
  margin-top: 50px;
  border: 1px solid #282c34;
  padding: 1.25rem 1.5rem;
  .title {
    line-height: 32px;
  }
}
</style>
