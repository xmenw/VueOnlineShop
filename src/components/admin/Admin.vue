<template>
  <div id="admin">
    <a-tabs defaultActiveKey="1"
            @change="changeTab"
            tabPosition="left"
            style="width: 100%">
      <a-tab-pane tab="添加商品"
                  key="1">
        <AddShop />
      </a-tab-pane>
      <a-tab-pane tab="商品数据统计"
                  key="2">
        <ShopsData />
      </a-tab-pane>
      <a-tab-pane tab="管理商品"
                  key="3">
        <a-table :dataSource="shops"
                 :columns="columns"
                 :pagination="pagination">
          <div slot="filterDropdown"
               slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
               style="padding: 8px">
            <a-input v-ant-ref="(c) => (searchInput = c)"
                     :placeholder="`搜索 ${column.dataIndex}`"
                     :value="selectedKeys[0]"
                     @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
                     @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary"
                      @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                      icon="search"
                      size="small"
                      style="width: 90px; margin-right: 8px">搜索</a-button>
            <a-button @click="() => handleReset(clearFilters)"
                      size="small"
                      style="width: 90px">重置</a-button>
          </div>
          <a-icon slot="filterIcon"
                  slot-scope="filtered"
                  type="search"
                  :style="{ color: filtered ? '#108ee9' : undefined }" />
          <template slot="pic"
                    slot-scope="text, record">
            <div class="imgwrap">
              <img :src="record.pic"
                   alt="商品图片" />
            </div>
          </template>
          <template v-for="col in ['desc', 'color', 'size', 'price', 'num']"
                    :slot="col"
                    slot-scope="text">
            <div :key="col">{{ text }}</div>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <router-link :to="'updateShop/' + record.id">
              <a-button type="primary"
                        style="marginRight:10px">
                修改
              </a-button>
            </router-link>
            <a-button type="danger"
                      @click="deleteById(record.desc, record.id)">
              删除
            </a-button>
          </template>
        </a-table>
      </a-tab-pane>
      <a-tab-pane tab="网站公告"
                  key="4">
        <NoticeList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import AddShop from './AddShop.vue'
import ShopsData from './ShopsData.vue'
import NoticeList from './NoticeList.vue'
const columns = [
  {
    title: '照片',
    dataIndex: 'pic',
    slots: { title: 'pic' },
    scopedSlots: { customRender: 'pic' },
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) =>
      record.desc
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        }, 0)
      }
    },
  },
  {
    title: '颜色',
    dataIndex: 'color',
  },
  {
    title: '尺寸',
    dataIndex: 'size',
  },
  {
    title: '价格',
    dataIndex: 'price',
  },
  {
    title: '库存',
    dataIndex: 'num',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { title: 'operation' },
    scopedSlots: { customRender: 'operation' },
  },
]
export default {
  name: 'Admin',
  data () {
    return {
      shops: [],
      columns,
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      pagination: {
        showQuickJumper: true,
        defaultCurrent: 1,
      },
    }
  },
  components: {
    AddShop,
    ShopsData,
    NoticeList
  },
  beforeRouteEnter: (to, from, next) => {
    if (localStorage.getItem('user') != 'aaa') {
      next('login')
    } else {
      next()
    }
  },
  created () {
    this.pagination.onChange = this.onChange
    this.queryAllShops()
    this.$axios
      .get(`api/queryShopsNum`)
      .then((response) => {
        this.len = response.data
        this.pagination.total = this.len
      })
      .catch((error) => {
        console.log(error)
        throw new Error('获取数据失败!')
      })
  },
  methods: {
    deleteById (desc, id) {
      let flag = confirm(`确定要删除“${desc}”吗?`)
      if (flag) {
        this.confirmed(id)
      }
    },
    confirmed (id) {
      this.$axios
        .get(`api/delete/${id}`)
        .then((response) => {
          if (response.data > 0) {
            alert('删除成功!')
            this.queryAllShops()
          } else {
            alert('删除失败!')
          }
        })
        .catch((error) => {
          console.log(error)
          throw new Error('获取数据失败!')
        })
    },
    queryAllShops () {
      this.$axios
        .get(`api/queryAllShops`)
        .then((response) => {
          this.shops = response.data
          this.shops.map((shop) => {
            return (shop.operation = { id: shop.id, desc: shop.desc })
          })
          console.log(this.shops)
        })
        .catch((error) => {
          console.log(error)
          throw new Error('获取数据失败!')
        })
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    onChange (pageNumber) {
      console.log('Page: ', pageNumber)
    },
    changeTab (key) {
      console.log(key);
    },
  },
}
</script>
<style lang="scss" scoped>
#admin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
  .addWrap {
    width: 100%;
    text-align: center;
    .addBtn {
      display: inline-block;
      width: 50%;
      padding: 10px 0;
      margin-bottom: 10px;
      border-radius: 10px;
      font-size: 16px;
      letter-spacing: 2em;
      border: 0;
      outline: 0;
      color: #fff;
      cursor: pointer;
      background-color: #43a047;
      &:hover {
        box-shadow: 0 0 5px #42a5f5;
      }
    }
  }

  table {
    text-align: center;
    .imgwrap {
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100px;
        height: 100px;
        vertical-align: middle;
        &:hover {
          transform: scale(1.2);
          transition: transform 0.5s;
        }
      }
    }
    thead {
      padding-bottom: 30px;
      th {
        font-weight: bold;
        padding-bottom: 10px;
      }
    }
    tbody {
      tr {
        border-radius: 10px;
        transition: all 0.3s;
      }
      tr:nth-of-type(2n) {
        background-color: #00bcd411;
      }
      tr:nth-of-type(2n + 1) {
        background-color: #b2dfdb;
      }
      tr:hover {
        background-color: #fff;
      }
      td {
        min-width: 100px;
        max-width: 300px;
        padding: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn {
        width: 50px;
        height: 30px;
        margin: 0 5px;
        line-height: 30px;
        border: none;
        outline: none;
        font-size: 12px;
        border-radius: 5px;
        background-color: #43a047;
        color: #fff;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 5px #42a5f5;
        }
        a {
          color: #fff;
        }
      }
      .delete {
        background-color: #f44336;
      }
    }
  }
}
</style>
