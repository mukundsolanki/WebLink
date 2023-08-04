<script>
    import { userData } from "$lib/firebase";

  </script>
  
  <svelte:head>
    <title>WebLink</title>
    <meta name="description" content="A linktree clone website created using Svelte and Firebase" />
  </svelte:head>
  
  <main class="flex w-full min-h-screen">
  
    <div class="hero bg-base-200">
      <div class="hero-content text-center">
        <div class="w-full">
          <h1 class="text-7xl font-bold">W E B L I N K</h1>
          <p class="py-6 text-2xl">One place for all your links</p> 
          {#if $userData?.username}
            <a href="/{$userData.username}/edit" class="btn btn-warning">Go to your profile</a>
          {:else}
            <a href="/login" class="btn btn-success">Get Started</a>
          {/if}
        </div>
      </div>
    </div>
    
  </main>