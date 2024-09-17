<script setup>
import { ref } from 'vue'

// 1.拿到table資料，先轉為陣列形式
// 2.到template刻畫面
// 2.1 const 定義飲料菜單drinkList的ref資料從哪來
// 2.2 v-for 渲染陣列資料->指定的區塊
const drinkList = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 18
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 34
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    stock: 20
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20
  }
])

const tempEdit = ref({})

const handleMinus = (drink) => {
  if (drink.stock > 0) {
    drink.stock--
  }
}

const handlePlus = (drink) => {
  drink.stock++
}

const nameEdit = (drink) => {
  tempEdit.value = { ...drink } // 拷貝
}

const confirmEdit = () => {
  const index = drinkList.value.findIndex((drink) => drink.id === tempEdit.value.id)
  console.log(index, drinkList.value)
  // 把 tempEdit 的值，帶回去 drinkList
  drinkList.value[index] = tempEdit.value

  tempEdit.value = ''
}
</script>

<template>
  <div class="container">
    <h3 class="mt-5">餐點管理工具</h3>
    <hr />
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col" class="name">品項</th>
            <th scope="col" class="description">描述</th>
            <th scope="col" class="price">價格</th>
            <th scope="col" class="stock">庫存</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="drink in drinkList" :key="drink.id">
            <td>
              <div>
                <div v-if="tempEdit.id === drink.id">
                  <input type="text" class="me-2" v-model="tempEdit.name" />
                  <button type="button" class="btn btn-success me-2" @click="confirmEdit">
                    確認
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    v-if="tempEdit.id"
                    @click="tempEdit = {}"
                  >
                    取消
                  </button>
                </div>
                <span v-else>{{ drink.name }}</span>
                <button
                  type="button"
                  class="btn btn-primary ms-3"
                  v-if="!tempEdit.id"
                  @click="nameEdit(drink)"
                >
                  編輯
                </button>
              </div>
            </td>
            <td>{{ drink.description }}</td>
            <td>{{ drink.price }}</td>
            <td>
              <button type="button" class="btn btn-danger" @click="handleMinus(drink)">-</button>
              {{ drink.stock }}
              <button type="button" class="btn btn-danger" @click="handlePlus(drink)">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
