<script lang="ts">
    import {user, userData} from '$lib/firebase'
    import "../global.css"

    $user;
    $userData;
</script>

<div class="min-h-screen flex flex-col">
    <slot />
</div>