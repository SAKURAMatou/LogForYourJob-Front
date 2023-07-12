<template>
    <div class="login-bottom">
        <p>
            <slot name="l"></slot>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>
                <slot name="r"></slot>
            </span>
        </p>
    </div>
</template>

<style scoped>
.login-bottom {
    color: #7d7d7d;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    margin-top: 36px;
    margin-left: 77px;
}
</style>
