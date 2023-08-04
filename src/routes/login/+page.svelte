<script lang="ts">
    import { auth, user } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";


    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
    }

</script>

{#if $user} 
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>

  <!-- <button class="btn btn-success"><a href="/username">NEXT</a></button> -->
  <button class="btn btn-error " on:click={() => signOut(auth)}>Sign out</button>
{:else}
<h2 class="card-title">To get started first make an account</h2>
  <button class="btn btn-success" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}