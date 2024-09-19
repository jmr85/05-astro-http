<template>
    <div v-if="isLoading">
        Loading...
    </div>
    <button v-else-if="likeCount === 0" @click="likePost">
        Like this post
    </button>
    <button v-else @click="likePost">
        Likes
        <span>{{ likeCount }}</span>
    </button>
</template>

<script lang="ts" setup>
    import { ref, defineProps, watch } from 'vue';
    import confetti from 'canvas-confetti';
    import debounce from 'lodash.debounce'
    import { actions } from 'astro:actions';

    interface Props {
        postId: string;
    }

    const props = defineProps<Props>();

    console.log(props.postId);

    const likeCount = ref(0);
    const likeClicks = ref(0);//debaunce para no mandar para cada click
    const isLoading = ref(true);//se puede hacer con TanStack Query

    watch( likeCount, debounce(() =>{
        // fetch(`/api/posts/likes/${ props.postId }`, {
        //     method: 'PUT',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ likes: likeClicks.value })
        // });

        actions.updatePostsLikes({
            postId: props.postId,
            likes: likeClicks.value,
        })

        likeClicks.value = 0;
    }, 500));

    const likePost = () => {
        likeCount.value++;
        likeClicks.value++;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: Math.random(), 
                y: Math.random() - 0.2 
            },
        })
    }

    const getCurrentLikes = async () => {

        const { data, error } = await actions.getPostLikes(props.postId);
    
        // const resp = await fetch(`/api/posts/likes/${ props.postId }`);
        // if ( !resp.ok ) return;

        // const data = await resp.json();

        if (error) {
            console.error('getCurrentLikes -> error: ', error);
            return;
        }
        
        const { likes } = data;

        console.log('getCurrentLikes -> resp: ', likes);

        likeCount.value = likes;
        isLoading.value = false; 
    }

    getCurrentLikes();
</script>

<style scoped>
    button {
        background-color: #5e51bc;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
    }

    button:hover {
        background-color: #4a3f9a;
    }
</style>