const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    car: [],
  },
  filters: {
    numberPrice(value) {
      return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
    },
  },
  computed: {
    carTotal() {
      let total = 0

      if (this.car.length) {
        this.car.forEach(item => {
          total += item.price
        })
      }

      return total
    }
  },

  methods: {
    fetchProducts() {
      fetch("./api/products.json")
        .then(r => r.json())
        .then(r => {
          this.products = r
        })
    },
    fetchProduct(id) {
      fetch(`./api/products/${id}/data.json`)
        .then(r => r.json())
        .then(r => {
          this.product = r
        })
    },
    openModal(id) {
      this.fetchProduct(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    closeModal({ target, currentTarget }) {
      if (target === currentTarget) this.product = false
    },
    addItem() {
      this.product.inventory--
      const { id, name, price } = this.product
      this.car.push({ id, name, price })
    },
    removeItem(index) {
      this.car.splice(index, 1)
    }
  },
  created() {
    this.fetchProducts()
  }
});