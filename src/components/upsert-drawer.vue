<template>
  <el-drawer :title="title" :visible.sync="show" direction="rtl" size="50%" :before-close="handleClose" @close="$emit('update:drawer', false)">
    <section class="pd20">
      <el-form :model="form" ref="form" style="width:100%" label-width="180px" v-if="drawer">
        <el-form-item label="渠道名称：" prop="type" :rules="{required:true,message:'请选择渠道名称',trigger:'change'}">
          <!-- <el-radio-group v-model="form.type">
            <template v-for="item in optionsChannelTypes">
              <el-radio-button :label="item.name" :key="item.id"></el-radio-button>
            </template>
          </el-radio-group> -->
          <el-select v-model="form.type" placeholder="请选择类型" size="small" class="w400" clearable>
            <template v-for="(item, index) in optionsChannelTypes">
              <el-option :key="index" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道商费率：" prop="rate" :rules="{required:true, validator:validator_percent, trigger: 'change'}">
          <el-input v-model="form.rate" type="number" min="0" size="small" class="w400" placeholder="请输入渠道商费率">
            <span slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="渠道商费用：" prop="rateAmount" :rules="{required:true, validator:validator_base, trigger: 'change'}">
          <el-input v-model="form.rateAmount" type="number" min="0" size="small" class="w400" placeholder="请输入渠道商费用">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <div v-if="form.type === 'alipay_app'">
          <el-form-item label="支付宝appid" prop="param.appid" :rules="{required:true,message:'请输入支付宝appid',trigger:'change'}">
            <el-input v-model="form.param.appid" size="small" class="w400" placeholder="请输入支付宝appid"></el-input>
          </el-form-item>
          <el-form-item label="渠道商私钥" prop="param.pri_key" :rules="{required:true,message:'请输入渠道商私钥',trigger:'change'}">
            <el-input v-model="form.param.pri_key" type="textarea" row="4" size="small" class="w400" placeholder="请输入渠道商私钥"></el-input>
          </el-form-item>
          <el-form-item label="支付宝公钥" prop="param.pub_key" :rules="{required:true,message:'请输入支付宝公钥',trigger:'change'}">
            <el-input v-model="form.param.pub_key" type="textarea" row="4" size="small" class="w400" placeholder="请输入支付宝公钥"> </el-input>
          </el-form-item>
        </div>
        <div v-if="form.type === 'alipay_individual'">
          <el-form-item label="收款人账号" prop="param.receiveAccountNo" :rules="{required:true,message:'请输入收款人账号',trigger:'change'}">
            <el-input v-model="form.param.receiveAccountNo" size="small" class="w400" placeholder="请输入收款人账号"></el-input>
          </el-form-item>
          <el-form-item label="收款人姓名" prop="param.receiveName" :rules="{required:true,message:'请输入收款人姓名',trigger:'change'}">
            <el-input v-model="form.param.receiveName" size="small" class="w400" placeholder="请输入收款人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收款人秘钥" prop="param.secret" :rules="{required:true,message:'请输入收款人秘钥',trigger:'change'}">
            <el-input v-model="form.param.secret" type="textarea" row="4" size="small" class="w400" placeholder="请输入收款人秘钥"></el-input>
          </el-form-item>
          <el-form-item label="收款二维码">
            <el-upload list-type="picture-card" class="avatar-uploader" :file-list="form.param.qrcode" action="" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
              :http-request="uploadHttp">
              <i slot="default" class="el-icon-upload"></i>
            </el-upload>
            <template v-for="(item,index) in form.param.qrcode">
              <p :key="index">
                二维码{{index+1}}备注： <el-input v-model="item.remark" size="small" class="w400 mt20" :placeholder="'请输入二维码'+(index+1)+'备注'">
                </el-input>
              </p>
            </template>
          </el-form-item>
        </div>
        <el-dialog :visible.sync="dialogVisible" :modal="false">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <div v-if="form.type === 'wx_app'">
          <el-form-item label="微信app_id" prop="param.app_id" :rules="{required:true,message:'请输入微信app_id',trigger:'change'}">
            <el-input v-model="form.param.app_id" size="small" class="w400" placeholder="请输入微信app_id"></el-input>
          </el-form-item>
          <el-form-item label="微信商户id" prop="param.mch_id" :rules="{required:true,message:'请输入微信微信商户id',trigger:'change'}">
            <el-input v-model="form.param.mch_id" size="small" class="w400" placeholder="请输入微信微信商户id"></el-input>
          </el-form-item>
          <el-form-item label="微信秘钥" prop="param.secret_key" :rules="{required:true,message:'请输入微信秘钥',trigger:'change'}">
            <el-input v-model="form.param.secret_key" type="textarea" row="4" size="small" class="w400" placeholder="请输入微信秘钥">
            </el-input>
          </el-form-item>
        </div>
        <div v-if="form.type === 'wx_individual'">
          <el-form-item label="收款人账号" prop="param.receiveAccountNo" :rules="{required:true,message:'请输入收款人账号',trigger:'change'}">
            <el-input v-model="form.param.receiveAccountNo" size="small" class="w400" placeholder="请输入收款人账号"></el-input>
          </el-form-item>
          <el-form-item label="收款人姓名" prop="param.receiveName" :rules="{required:true,message:'请输入收款人姓名',trigger:'change'}">
            <el-input v-model="form.param.receiveName" size="small" class="w400" placeholder="请输入收款人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收款人秘钥" prop="param.secret" :rules="{required:true,message:'请输入收款人秘钥',trigger:'change'}">
            <el-input v-model="form.param.secret" type="textarea" row="4" size="small" class="w400" placeholder="请输入收款人秘钥"></el-input>
          </el-form-item>
          <el-form-item label="收款二维码">
            <el-upload list-type="picture-card" class="avatar-uploader" :file-list="form.param.qrcode" action="" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
              :http-request="uploadHttp">
              <i slot="default" class="el-icon-upload"></i>
            </el-upload>
            <template v-for="(item,index) in form.param.qrcode">
              <p :key="index">
                二维码{{index+1}}备注： <el-input v-model="item.remark" size="small" class="w400 mt20" :placeholder="'请输入二维码'+(index+1)+'备注'">
                </el-input>
              </p>
            </template>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" class="w100" size="small" :disabled="isLock" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </section>
  </el-drawer>
</template>

<script>
/* eslint-disable */
import { getChannelTypeList } from '@/api/public'
import { postChannelAdd, postChannelUpdate } from '@/api/client'
import validate from '@/mixin/validate'
import { ossUpload, uploadImg } from '@/api/public'
import { mapGetters } from 'vuex'
export default {
  name: 'upsert-drawer',
  components: {},
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '我是标题'
    },
    form: {
      type: Object,
      default: () => { }
    }
  },
  mixins: [validate],
  data() {
    return {
      show: this.drawer,
      optionsChannelTypes: [],
      isLock: false,
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  computed: {
    ...mapGetters(['uChannelInfo'])
  },
  watch: {
    drawer() {
      this.show = this.drawer
      this.form.rate = Number((this.form.rate * 10000 / 100).toFixed(2))
      this.form.rateAmount = this.form.rateAmount / 100
    }
  },
  methods: {
    async getChannelTypeList() {
      const res = await getChannelTypeList()
      this.optionsChannelTypes = res.data
    },
    async postChannelAdd() {
      try {
        const rate = Number((this.form.rate / 100).toFixed(4))
        const rateAmount = this.form.rateAmount * 100
        await postChannelAdd({ ...this.form, uid: this.uChannelInfo.id, rate, rateAmount })
        this.show = false
        this.isLock = false
        this.$emit('refresh')
        this.$message({
          type: 'success',
          message: '新增成功'
        })
      } catch (error) {
        this.isLock = false
      }
    },
    async postChannelUpdate() {
      try {
        const rate = Number((this.form.rate / 100).toFixed(4))
        const rateAmount = this.form.rateAmount * 100
        await postChannelUpdate({ ...this.form, rate, rateAmount })
        this.show = false
        this.isLock = false
        this.$emit('refresh')
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } catch (error) {
        this.isLock = false
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      // const uid = file.uid
      // let fileIndex = null
      // this.form.param.qrcode.forEach((item, index) => {
      //   if (item.uid === uid) {
      //     fileIndex = index
      //   }
      // })
      // if (fileIndex !== null) {
      this.form.param.qrcode.splice(this.form.param.qrcode.indexOf(file), 1)
      // }
    },
    uploadHttp(content) {
      this.file = content.file
      this.ossUpload(this.file.type)
    },
    async ossUpload(type) {
      const res = await ossUpload({ suffix: type })
      await this.uploadImg(res.data, this.file)
    },
    async uploadImg(data, file) {
      await uploadImg(data, file)
      const url = `${data.url}/${data.param.key}`
      this.form.param.qrcode.push({ url, uid: file.uid })
      this.$message.success('上传图片成功')
    },
    submitForm(formName) {
      this.isLock = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('提交的信息是否无误?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.title === '渠道商新增渠道') {
              this.postChannelAdd()
            } else {
              this.postChannelUpdate()
            }
          }).catch(() => {
            this.isLock = false
            this.$message({
              type: 'info',
              message: '已取消操作'
            })
          })
        } else {
          this.isLock = false
          return false
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    validator_percent(rule, value, callback) {
      const reg = /^([0-9]*)+(.[0-9]{1,2})?$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入比例费率'))
      } else if (value > 100 || value < 0) {
        callback(new Error('费率[0,100]'))
      } else if (!reg.test(value)) {
        callback(new Error('数据不符合规范，（保留两位小数）'))
      } else {
        callback()
      }
    },
    validator_base(rule, value, callback) {
      const reg = /^([0]|[1-9][0-9]*)$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入固定费率'))
      } else if (!reg.test(value) || value > 999999999) {
        callback(new Error('请输入整数,0~999999999'))
      } else {
        callback()
      }
    },
  },
  created() {
    this.getChannelTypeList()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.avatar {
  width: 178px;
}
/deep/.el-dialog__wrapper {
  z-index: 2999 !important;
}
</style>
