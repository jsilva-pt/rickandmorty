<template>
  <div class="entity-list">
    <table>
      <tr v-for="(item, itemIndex) in items" :key="itemIndex">
        <td v-for="(values, valueIndex) in item" :key="valueIndex" >
          {{ values }}
        </td>
      </tr>
    </table>

    <paginate
      v-model="page"
      :page-count="numberOfPages"
      :page-range="3"
      :margin-pages="2"
      :click-handler="onPageChange"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'">
    </paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
import { getRecourseData } from '@/api'
export default {
  name: 'EntityList',
  components: {
    Paginate
  },
  beforeRouteUpdate (to, from, next) {
    if (from.params.resource !== to.params.resource) {
      this.page = 1
    } else {
      this.page = Number(to.query.page) || 1
    }

    this.fetchData(to.params.resource)
    next()
  },
  data () {
    return {
      items: [],
      numberOfPages: 0,
      page: Number(this.$route.query.page) || 1
    }
  },
  async created () {
    this.fetchData(this.$route.params.resource)
  },
  methods: {
    async fetchData (resource) {
      var response = await getRecourseData({
        resource,
        page: this.page
      })

      this.items = response.results
      this.numberOfPages = response.numberOfPages
    },
    onPageChange (pageNum) {
      this.$router.push({ query: {
        page: pageNum
      }})
    }
  }
}
</script>

<style scoped>
.entity-list {
  margin: auto;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table {
  border-collapse:separate; 
  border-spacing:0 4px;
}

tr {
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

tr:hover {
  max-width: 430px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

td {
  padding: 8px;
  text-align: left;
}
</style>
