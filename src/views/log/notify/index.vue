<template>
  <section class="pd20">
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="商户id：">
        <el-input placeholder="请输入商户id" size="mini" v-model="queryForm.uid" @keyup.enter.native="check" clearable></el-input>
      </el-form-item>
      <el-form-item label="回调状态：">
        <el-select v-model="queryForm.status" placeholder="请选择回调状态" size="mini" clearable>
          <el-option label="全部" value=""></el-option>
          <template v-for="(item, index) in statusList">
            <el-option :key="index" :label="item" :value="item"></el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="时间范围：">
        <el-date-picker size="mini" v-model="rangeTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" class="w80" icon="el-icon-search" @click="check">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" stripe class="mt20" :header-cell-style="headerStyle">
      <el-table-column type="expand" width="30">
        <template slot-scope="scope">
          <el-form label-position="left" class="demo-table-expand" label-width="150px" style="width:100%">
            <el-form-item label="签名：">
              <el-input :value="scope.row.sign" readonly type="textarea" rows="4"></el-input>
            </el-form-item>
            <el-form-item label="回调参数：">
              <ul v-if="scope.row.param !=false">
                <template v-for="(item,key,index) in JSON.parse(scope.row.param)">
                  <li :key="index">
                    {{key}} : {{item}}
                  </li>
                </template>
              </ul>
              <span v-else>null</span>
            </el-form-item>
            <el-form-item label="最后回调响应：">
              <ul v-if="scope.row.response !=false">
                <template v-for="(item,key,index) in JSON.parse(scope.row.response)">
                  <li :key="index">
                    {{key}} : {{item}}
                  </li>
                </template>
              </ul>
              <span v-else>null</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="uid" label="商户id" align="center"></el-table-column>
      <el-table-column prop="times" label="回调次数" align="center"></el-table-column>
      <el-table-column prop="url" label="回调地址" align="center">
      </el-table-column>
      <el-table-column prop="status" label="回调状态" align="center"></el-table-column>
      <el-table-column prop="last_callback_time" label="最后回调时间" align="center">
      </el-table-column>
      <el-table-column prop="http_code" label="最后回调状态码" align="center"></el-table-column>
    </el-table>
    <el-pagination class="mt20 tr" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="PAGINATION.currentPage"
      :page-sizes="[5, 10, 20, 40]" :page-size="PAGINATION.pageSize" layout="total,sizes, prev, pager, next, jumper" :total="PAGINATION.total">
    </el-pagination>
  </section>
</template>

<script>
import { getNotifyLogs } from '@/api/log'
import { mapGetters } from 'vuex'
const statusList = [
  'created', 'fail', 'success'
]
export default {
  name: 'list',
  components: {},
  data() {
    return {
      method: 'getNotifyLogs',
      loading: false,
      tableData: [],
      queryForm: {
        uid: '',
        status: ''
      },
      statusList,
      pickerOptions: {
        disabledDate(time) {
          var todayYear = (new Date()).getFullYear()
          var todayMonth = (new Date()).getMonth()
          var todayDay = (new Date()).getDate()
          var todayTime = (new Date(todayYear, todayMonth, todayDay, '23', '59', '59')).getTime()// 毫秒
          return time.getTime() > todayTime
        }
      }
    }
  },
  computed: {
    ...mapGetters(['mChannelInfo'])
  },
  watch: {
  },
  methods: {
    async getNotifyLogs() {
      this.loading = true
      const res = await getNotifyLogs({ ...this.queryParams })
      this.tableData = res.data.rows
      this.PAGINATION.total = res.data.count
      this.loading = false
    }
  },
  created() {
    this.check()
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
