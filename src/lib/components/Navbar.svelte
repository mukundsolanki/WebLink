<script>
    import { getAuth, signOut } from "firebase/auth";

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
    <div class="text-white pl-7 font-bold text-lg">WEBLINK</div>
    <div class="flex items-center space-x-4">
      <a href="/about" class="text-white hover:text-gray-300">About</a>
      <button class="btn btn-outline btn-error block mx-auto my-4" on:click={handleSignOut}>
        Sign Out
      </button>
    </div>
  </nav>
  