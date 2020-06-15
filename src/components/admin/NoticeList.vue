<template>
  <div id="noticeList">
    <a-button type="primary"
              @click="openNotice()">
      添加公告
    </a-button>
    <a-table :dataSource="notices"
             :columns="columns"
             :loading="loading"
             :pagination="pagination">
      <template slot="operation"
                slot-scope="text, record">
        <a-button type="primary"
                  @click="openNotice(record.id)"
                  style="marginRight:10px">
          修改
        </a-button>
        <a-popconfirm title="确定要删除这个通知吗？"
                      @confirm="deleteById(record.id)"
                      okText="确定"
                      cancelText="取消">
          <a-button type="danger">
            删除
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal title="修改公告"
             v-model="visible"
             :destroyOnClose="true"
             @ok="handleSubmit">
      <a-form :form="form"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 15 }">
        <a-form-item label="id"
                     v-if="!this.isAddNotice">
          <a-input v-decorator="['id']"
                   disabled />
        </a-form-item>
        <a-form-item label="标题">
          <a-input v-decorator="[
          'title',
          { rules: [{ required: true, message: '标题不能为空' },
          { max: 50, message: '标题不能大于50个字' }] },
        ]"
                   placeholder="请输入标题">
          </a-input>
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-decorator="[
          'content',
          { rules: [{ required: true, message: '内容不能为空' },
          { max: 300, message: '内容不能大于300个字' }] },
        ]"
                      placeholder="请输入公告内容">
          </a-textarea>
        </a-form-item>
        <a-form-item label="时间">
          <a-date-picker v-decorator="['time', { defaultValue: formateData, rules: [{ required: true, message: '时间不能为空' }]}]"
                         show-time
                         :disabledDate="disabledEndDate"
                         format="YYYY-MM-DD HH:mm:ss" />
        </a-form-item>
        {{ formateData }}
      </a-form>
    </a-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { title: 'operation' },
    scopedSlots: { customRender: 'operation' },
  },
]
import { message } from 'ant-design-vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
export default {
  name: "NoticeList",
  data () {
    return {
      notices: [],
      columns,
      loading: false,
      visible: false,
      isAddNotice: false,
      pagination: {
        showQuickJumper: true,
        defaultCurrent: 1,
      },
      currentTime: new Date()
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'time_related_controls' });
  },
  async created () {
    this.getAllNotice()
  },
  computed: {
    formateData () {
      console.log(this.currentTime, Date.now())
      return moment(this.currentTime, 'YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          message.error('请检查一下您的输入')
          return;
        } else {
          fieldsValue.time = fieldsValue.time.format('YYYY-MM-DD HH:mm:ss')
          console.log(fieldsValue)
          this.isAddNotice ? this.sendAddData(fieldsValue) : this.sendModifyData(fieldsValue)
        }
      })
    },
    deleteById (id) {
      this.$axios.get(`/api/deleteNoticeById/${id}`)
        .then((res) => {
          console.log(res)
          this.getAllNotice()
          message.success('公告删除成功')
        })
        .catch((err) => {
          console.log(err)
          message.error('公告删除失败')
        })
    },
    async getAllNotice () {
      let { data } = await this.queryAllNotices()
      console.log(data)
      this.notices = data
    },
    queryAllNotices () {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$axios.get('/api/queryAllNotice')
          .then((res) => {
            console.log(res)
            resolve(res)
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
            reject(err)
            message.error('获取公告失败')
          })
      })
    },
    async openNotice (id) {
      this.visible = true
      this.isAddNotice = id ? false : true
      if (id) {
        let { data } = await this.queryNoticeById(id)
        this.currentTime = data[0].time = moment(this.currentTime, 'YYYY-MM-DD HH:mm:ss')
        setTimeout(() => {
          this.form.setFieldsValue(...data)
        }, 0);
      }
    },
    sendAddData (values) {
      let param = new URLSearchParams(values);
      this.$axios.post('/api/insertNotice', param)
        .then((res) => {
          console.log(res)
          this.visible = false
          this.queryAllNotices()
          message.success('添加公告成功')
        })
        .catch((err) => {
          console.log(err)
          this.visible = false
          this.queryAllNotices()
          message.error('添加公告失败')
        })
    },
    sendModifyData (values) {
      let param = new URLSearchParams(values);
      this.$axios.post('/api/modifyNotice', param)
        .then((res) => {
          console.log(res)
          this.visible = false
          this.getAllNotice()
          message.success('修改公告成功')
        })
        .catch((err) => {
          console.log(err)
          this.visible = false
          message.error('修改公告失败')
        })
    },
    queryNoticeById (id) {
      if (!id) {
        return
      }
      return new Promise((resolve, reject) => {
        this.$axios.get(`/api/queryNoticeById/${id}`)
          .then((res) => {
            console.log(res)
            resolve(res)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
            message.error('获取公告失败')
          })
      })
    },
    disabledEndDate (current) {
      return current && current < moment().subtract(1, 'days').endOf('day');
    }
  }
}
</script>
<style lang="scss" scoped>
#NoticeList {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
</style>