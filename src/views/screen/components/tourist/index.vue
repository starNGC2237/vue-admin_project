<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">
        {{ item }}
      </span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";

let people = ref("216908人");
let charts = ref<HTMLElement>();
onMounted(() => {
  let myChart = echarts.init(charts.value);
  myChart.setOption({
    series: [
      {
        type: "liquidFill",
        data: [0.6, 0.3],
        animationDuration: 3,
        animationDurationUpdate: 3,
        radius: "80%",
        outline: {
          show: true,
          borderDistance: 1,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#29fcff",
            shadowBlur: 0,
          },
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box {
  background: url(../../../../assets/images/screen/dataScreen-main-lt.png)
    no-repeat;
  background-size: 100% 100%;
  .top {
    margin-left: 0;
    .title {
      color: #fff;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../../../assets/images/screen/dataScreen-title.png)
        no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      position: relative;
      top: -15px;
      right: 10px;
      color: #fff;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    margin-top: 20px;
    display: flex;
    padding: 10px;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../../../assets/images/screen/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
  }
}
</style>
