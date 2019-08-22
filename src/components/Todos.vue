<template>
  <section class="todoapp">
    <header class="header">
      <h1>Todos</h1>
      <input type="checkbox" name="todo" id="todo" v-model="allDone" class="toggle-all" />
      <input
        type="text"
        class="new-todo"
        placeholder="Ajouter une tâche"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    </header>
    <div class="main">
      <ul class="todo-list">
        <li
          class="todo"
          v-for="todo in filteredTodos"
          :class="{completed: todo.completed, editing: todo === editing}"
        >
          <div class="view">
            <input type="checkbox" name="todo" id="todo" v-model="todo.completed" class="toggle" />
            <label @dblclick="editTodo(todo)">{{todo.name}}</label>
            <button class="destroy" @click.prevent="deleteTodo(todo)"></button>
          </div>
          <input
            type="text"
            class="edit"
            v-model="todo.name"
            @keyup.enter="doneEdit"
            @blur="doneEdit"
            @keyup.esc="cancelEdit"
            v-focus="todo === editing"
          />
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="hasTodos">
      <span class="todo-count">
        <strong>{{remaining}}</strong> tâches à faire
      </span>
      <ul class="filters">
        <li>
          <a href="#" :class="{selected: filter === 'all'}" @click.prevent="filter = 'all'">All</a>
        </li>
        <li>
          <a href="#" :class="{selected: filter === 'todo'}" @click.prevent="filter = 'todo'">To do</a>
        </li>
        <li>
          <a href="#" :class="{selected: filter === 'done'}" @click.prevent="filter = 'done'">Done</a>
        </li>
      </ul>
      <button
        class="clear-completed"
        v-show="completed"
        @click.prevent="deleteCompleted"
      >Delete all tasks done</button>
    </footer>
  </section>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      todos: this.value,
      newTodo: "",
      filter: "all",
      editing: null,
      oldTodoName: ""
    };
  },
  watch: {
    value (value) {
      this.todos = value
    }
  },
  methods: {
    addTodo() {
      this.todos.push({
        completed: false,
        name: this.newTodo
      });
      this.newTodo = "";
    },
    deleteTodo(todo) {
      this.todos = this.todos.filter(item => item !== todo);
      this.$emit('input', this.todos)
    },
    deleteCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
      this.$emit('input', this.todos)
    },
    editTodo(todo) {
      this.editing = todo;
      this.oldTodoName = todo.name;
    },
    doneEdit() {
      this.editing = null;
    },
    cancelEdit() {
      this.editing.name = this.oldTodoName;
      this.doneEdit();
    }
  },
  computed: {
    allDone: {
      get() {
        return this.remaining === 0;
      },
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    completed() {
      return this.todos.filter(todo => todo.completed).length;
    },
    filteredTodos() {
      if (this.filter === "todo") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === "done") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    },
    hasTodos() {
      return this.todos.length > 0;
    }
  },
  directives: {
    focus(el, value) {
      if (value) {
        Vue.nextTick(_ => {
          el.focus();
        });
      }
    }
  }
};
</script>

<style src="./todos.css"></style>