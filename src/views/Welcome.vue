<template>
    <div class="welcome">
        <h1>欢迎使用超市收银系统</h1>
        <p>基本要求：收银员登录后方能进行收银操作。由收银员输入顾客的会员卡卡号（若有
            卡）、所购商品的货号、数量等。从数据库中取出有关价格信息，再把这些信息返回
            给收银台，完成收银功能。同时把该收银台有关种类商品的剩余量以及该持卡顾客（若
            有卡）的消费情况交数据库存储以供查询。</p>
         
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>

<style lang="less" scoped>
.welcome{
    background:pink;
    width: 100%;
    height: 100%;
}
p{
    margin: 50px;
    text-align: left;
}
</style>