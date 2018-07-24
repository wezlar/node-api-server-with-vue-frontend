<template>
  <div>
    <header>
      <div class="logo">
        <img src="../assets/logo.jpg">
      </div>
      <nav>
        <ul>
          <li>
            <a href="/tickets">View all Tickets</a>
          </li>
          <li>
            <a href="/">Create new Ticket</a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>
<script>
  export default {
    name: 'Nav',
    props: ['name'],
    methods: {
      setActive(option) {
        this.$parent.$parent.isActive = option;
      }
    }
  }
</script>
<style lang="scss" scoped>
  header {
    text-align: left;
    margin: 0 20px;
    display: flex;
    justify-content: space-between;

    img {
      max-height: 75px;
    }
  }
  nav {
    ul {
      list-style: none;
      padding-left: 0;
      margin: 0;

      li {
        display: inline-block;
        margin: 10px;

        a{
          display: inline-block;
          border-radius: 2px;
          padding: 5px 15px;
          color: #fff;
          background: #1991a4;
          }
      }
    }
  }
</style>
