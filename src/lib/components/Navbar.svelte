<script>
// @ts-nocheck
    import { getAuth, signOut } from "firebase/auth";
    import { userData } from "$lib/firebase";
    
    async function handleSignOut() {
      const auth = getAuth();
      
      try {
        await signOut(auth);
    
        window.location.href = "/";
      } catch (error) {
        console.error("Error signing out");
      }
    }
  </script>
  
  <nav class="bg-gray p-1 flex items-center justify-between m-0">
    <div class="text-black pl-7 font-bold text-lg">WEBLINK</div>
    <div class="flex items-center space-x-4">
      <a href="/{$userData.username}/edit" class="text-black font-semibold hover:text-gray-300">Profile</a>
      <a href="/about" class="text-black hover:text-gray-300 font-semibold">About</a>
      <button class="btn btn-outline btn-error block mx-auto my-4" on:click={handleSignOut}>
        Sign Out
      </button>
    </div>
  </nav>
  