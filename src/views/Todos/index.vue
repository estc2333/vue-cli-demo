<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <ul>
      <li v-for="todo in todos" :key="todo.title">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
        <button v-if="todo.done">delete</button>
      </li>
    </ul>

    <div>
      全选<input type="checkbox" v-model="allDone" />
      {{ active }}
      /
      {{ all }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      title: "",
      todos: [
        { title: "吃饭", done: false },
        { title: "睡觉", done: true },
      ],
    };
  },
  watch: {
    todos: {
      handler(newVal, oldVal) {
        localStorage.setItem('todos',
            JSON.stringify(newVal)
        );
      },
      deep: true,
    }
  },
  computed: {
    active() {
      return this.todos.filter((v) => !v.done).length;
    },
    all() {
      return this.todos.length;
    },
    allDone: {
      get: function () {
        return this.active === 0;
      },
      set: function (val) {
        console.log(val, "val");

        this.todos.forEach((todo) => {
          todo.done = val;
        });
      },
    },
  },
  methods: {
    addTodo() {
      this.todos.push({
        title: this.title,
        done: false,
      });
      this.title = "";
    },
  },
  mounted() {
    localStorage.setItem('todos',
        JSON.stringify(this.todos)
    );
    if (localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'))
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.done {
  color: gray;
  text-decoration: line-through;
}
</style>

