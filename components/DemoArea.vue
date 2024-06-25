<template>
  <div class="demoArea">
    <span>DEMO</span>
  </div>
</template>

<style lang="scss" scoped>
.demoArea {
  width: 100%;
  height: 200px;
  background-color: #c7c7c7;
  position: relative;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    color: white;
    font-weight: bold;
  }
}
</style>