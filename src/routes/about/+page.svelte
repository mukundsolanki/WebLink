<script lang="ts">
    import type { PageData } from './$types';
    import Navbar from '$lib/components/Navbar.svelte';

    export let data: PageData;
</script>

<Navbar/>
<main>
    <div class="container mx-auto py-8">
      <h1 class="text-5xl font-bold mb-4">About</h1>
      <p class="text-lg">
        Welcome to WebLink! This is a place where you can manage all
        your social links and create your public or private profile to share with
        your friends.
      </p>

      <button class="btn btn-outline btn-success block mx-auto my-4">
        <a target="_blank" href="https://www.github.com/mukundsolanki" >G I T H U B</a>
      </button>
    </div>
  </main>
  
  <style>
    .container {
      max-width: 800px;
    }
  </style>
  