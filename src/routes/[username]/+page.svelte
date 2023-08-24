<script lang="ts">
  import Footer from "$lib/components/Footer.svelte";
  import UserLink from "$lib/components/UserLink.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
  </script>
  
  <svelte:head>
    <title>WebLink -@{data.username}</title>
  </svelte:head>
  
  <main class="prose text-center mx-auto mt-8">
  
    <img
      src={data.photoURL ?? "/user.png"}
      alt="photoURL"
      width="256"
      class="mx-auto"
    />

    <h2 class="text-4xl text-stone-950">
      @{data.username}
    </h2>
  
    <ul class="list-none">
      {#each data.links as item}
      <li class="my-2">
        <UserLink {...item} />
        <!-- <div class="divider"></div>  -->
      </li>
      {/each}
    </ul>
    
    
  </main>