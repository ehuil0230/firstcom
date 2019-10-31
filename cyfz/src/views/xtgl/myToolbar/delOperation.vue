<template>
    
</template>

<script>
    export default {
        name: "delOperation",
        data() {
        },
        methods:{
            delete(){
                let that = this
                that.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.$axios({
                        method: 'post',
                        url:  'http://mockjs.com/api/xctjDel',
                        data:that.cldIds
                    }).then(
                        function (res) {
                            if(res.result==1){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                that.checkedData = [];
                                that.$refs.table.loadData()
                            }else {
                                that.$message({
                                    type: 'warning',
                                    message: '删除失败!'
                                });
                            }
                        })

                }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>