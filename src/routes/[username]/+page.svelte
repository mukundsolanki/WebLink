<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
    import type { PageData } from "./$types";
    
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>@{data.username} Links</title>
  </svelte:head>
  
  
  <main class="prose text-center mx-auto mt-8">

    <h1 class="text-5xl text-purple-500">
      @{data.username}
    </h1>
  
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto"
    />
  
    <ul class="list-none">
      {#each data.links as item}
      <li class="my-2">
        <UserLink {...item} />
      </li>
      {/each}
    </ul>
  
  </main>