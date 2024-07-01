<template>
  <div class="container">
    <div class="row py-3 py-md-5">
      <div class="col-12 col-md-4 text-white py-3 py-sm-0">LOGO</div>
      <div class="col-12 col-md-4 d-flex justify-content-between text-white py-3 py-sm-0">
        Copyright © 2024 Ian. All rights reserved.
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-md-end py-3 py-sm-0">
        <svg class="icon">
          <use href="../assets/images/facebook.svg#facebook"></use>
        </svg>
        <svg class="icon">
          <use href="../assets/images/instagram.svg#instagram"></use>
        </svg>
        <svg class="icon">
          <use href="../assets/images/pinterest.svg#pinterest"></use>
        </svg>
        <svg class="icon">
          <use href="../assets/images/x.svg#X"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 20px;
  margin: 0 10px;
  cursor: pointer;
  fill: white;
  transition: 0.3s;
  &:hover {
    fill: yellow;
  }
}
</style>