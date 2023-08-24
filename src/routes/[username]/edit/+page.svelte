<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import { page } from "$app/stores";
    import AuthState from "$lib/components/AuthState.svelte";
    import SortableList from "$lib/components/SortableList.svelte";
    import UserLink from "$lib/components/UserLink.svelte";
    import { db, userData, user } from "$lib/firebase";
    import {
      arrayRemove,
      arrayUnion,
      doc,
      setDoc,
      updateDoc,
    } from "firebase/firestore";
    import { writable } from "svelte/store";
    // import { toast } from "svelte-french-toast";
    // import ToastContainer from "svelte-french-toast";
    import toast, {Toaster} from 'svelte-french-toast';

    const icons = [
      "Twitter",
      "YouTube",
      "LinkedIn",
      "GitHub",
      "Custom",
    ];
    const formDefaults = {
      icon: "custom",
      title: "",
      url: "https://",
    };
    const formData = writable(formDefaults);
  
    let showForm = false;
  
    $: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
    $: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
    $: formIsValid = urlIsValid && titleIsValid;
  
    function sortList(e: CustomEvent) {
      const newList = e.detail;
      const userRef = doc(db, "users", $user!.uid);
      setDoc(userRef, { links: newList }, { merge: true });
    }
  
    async function addLink(e: SubmitEvent) {
      const userRef = doc(db, "users", $user!.uid);
  
      await updateDoc(userRef, {
        links: arrayUnion({
          ...$formData,
          id: Date.now().toString(),
        }),
      });
  
      formData.set({
        icon: "",
        title: "",
        url: "",
      });
  
      showForm = false;
    }
  
    async function deleteLink(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        links: arrayRemove(item),
      });
    }
  
    async function toggleProfileStatus(item: any) {
      const userRef = doc(db, "users", $user!.uid);
      await updateDoc(userRef, {
        published: !$userData?.published,
      });
      toast.success('Successfully Changed Profile Settings!')
    }
  
    function cancelLink() {
      formData.set(formDefaults);
      showForm = false;
    }

  //   async function handleSignOut() {
  //   const auth = getAuth();
    
  //   try {
  //     await signOut(auth);
      
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Error signing out:");
  //   }
  // }

  function copyLinkToClipboard() {
    const linkElement = document.createElement("textarea");
    // linkElement.value = `https://localhost:5173/${$userData?.username}`;
    linkElement.value = `https://weblink-tawny.vercel.app/${$userData?.username}`;
    document.body.appendChild(linkElement);
    linkElement.select();
    document.execCommand("copy");
    document.body.removeChild(linkElement);
    toast.success('Link Copied Sucessfully!')
  }

  function handleClick() {
		toast.success('Link Added Sucessfully!')
	}
</script>

  <Navbar/>
  <main class="max-w-xl mx-auto">
    <!-- <ToastContainer position="top-right" /> -->
    <Toaster />

    {#if $userData?.username == $page.params.username}
      <div class="text-center mb-8">
        <p>
          Profile Link:
          <a
            href={`/${$userData?.username}`}
            class="link link-error"
            target="_blank"
          >
          <!-- https://weblink-tawny.vercel.app/{$userData?.username} -->
          CLICK HERE
          </a>
        </p>
        <button on:click={copyLinkToClipboard} class="btn btn-outline mt-5 btn-xs">
          Copy to Clipboard
        </button>

          <a class="btn btn-outline btn-xs" href="/login/photo">Change photo</a>
      </div>
  

  
      <form class="form-control">
        <label class="label cursor-pointer flex items-start justify-center">
          <span class="label-text mr-6">
            <div
              class="tooltip group-hover:tooltip-open"
              data-tip="If public, the world can see your profile"
            >
              {$userData?.published ? "Public profile" : "Private profile"}
            </div>
          </span>
          <input
            type="checkbox"
            class="toggle toggle-success"
            checked={$userData?.published}
            on:change={toggleProfileStatus}
          />
        </label>
      </form>
  
      <SortableList list={$userData?.links} on:sort={sortList} let:item let:index>
        <div class="group relative">
          <UserLink {...item} />
          <button
            on:click={() => deleteLink(item)}
            class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10"
            >Delete</button
          >
        </div>
      </SortableList>
      {#if showForm}
        <form
          on:submit|preventDefault={addLink}
          class="bg-base-200 p-6 w-full mx-auto rounded-xl"
        >
          <select
            name="icon"
            class="select select-sm"
            bind:value={$formData.icon}
          >

            {#each icons as icon}
              <option value={icon.toLowerCase()}>{icon}</option>
            {/each}
          </select>
          <input
            name="title"
            type="text"
            placeholder="Title"
            class="input input-sm"
            bind:value={$formData.title}
          />
          <input
            name="url"
            type="text"
            placeholder="URL"
            class="input input-sm"
            bind:value={$formData.url}
          />
          <div class="my-4">
            <!-- {#if !titleIsValid}
              <p class="text-error text-xs">Must have valid title</p>
            {/if} -->
            {#if !urlIsValid}
              <p class="text-error text-xs">Must have a valid URL</p>
            {/if}
            {#if formIsValid}
              <p class="text-success text-xs">Looks good!</p>
            {/if}
          </div>
  
          <button
            disabled={!formIsValid}
            type="submit"
            class="btn btn-success block"
            on:click={handleClick}>Add Link</button
          >
  
          <button type="button" class="btn btn-xs my-4" on:click={cancelLink}>Cancel</button>
        </form>
      {:else}
        <button
          on:click={() => (showForm = true)}
          class="btn btn-outline btn-info block mx-auto my-4"
        >
          ADD
        </button>
      {/if}
    {/if}

  </main>