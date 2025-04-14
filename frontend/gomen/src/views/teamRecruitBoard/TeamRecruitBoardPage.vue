<template>
  <div class="team-recruit-board-page">
    <div class="page-container">

      <div class="content-wrapper">
        <h1 class="page-title">🧩팀 모집 게시판</h1>

        <FilterBar @search="handleSearch" />

        <div class="post-list">
          <PostRow
            v-for="post in paginatedPosts"
            :key="post.id"
            :post="post"
          />
        </div>

        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="handlePageChange"
        />

        <WriteButton />
      </div>
    </div>
  </div>
</template>

<script setup>
import FilterBar from '@/components/TeamRecruitBoard/FilterBar.vue'
import PostRow from '@/components/TeamRecruitBoard/PostRow.vue'
import Pagination from '@/components/TeamRecruitBoard/Pagination.vue'
import WriteButton from '@/components/TeamRecruitBoard/WriteButton.vue'

import { ref, computed, onMounted } from 'vue'

//  전체 게시글 목록
const posts = ref([])

//  검색 및 필터 상태
const searchParams = ref({ category: 'all', keyword: '', filter: 'all' })

const handleSearch = (params) => {
  searchParams.value = params
  currentPage.value = 1 // 검색 시 페이지를 1로 초기화
}

//  필터링된 게시글
const filteredPosts = computed(() => {
  const keyword = searchParams.value.keyword.toLowerCase()
  const filterType = searchParams.value.filter
  const isRecruitingOnly = searchParams.value.category === 'recruiting'

  const sortedPosts = posts.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))  // 내림차순 정렬

  return sortedPosts.filter((post) => {
    const matchesRecruiting = !isRecruitingOnly || post.isActivated === 'Y'

    const matchesKeyword = (() => {
      if (!keyword) return true
      if (filterType === 'teamName') {
        return post.teamName?.toLowerCase().includes(keyword)
      } else if (filterType === 'title') {
        return post.title?.toLowerCase().includes(keyword)
      } else if (filterType === 'nickname') {
        return post.nickname?.toLowerCase().includes(keyword)
      } else {
        return (
          post.teamName?.toLowerCase().includes(keyword) ||
          post.title?.toLowerCase().includes(keyword) ||
          post.nickname?.toLowerCase().includes(keyword)
        )
      }
    })()

    return matchesKeyword && matchesRecruiting
  })
})

//  Pagination
const currentPage = ref(1)
const postsPerPage = 10

const totalPages = computed(() =>
  Math.ceil(filteredPosts.value.length / postsPerPage)
)

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

onMounted(async () => {
  const res = await fetch('http://localhost:3001/teamRecruitPosts')
  const data = await res.json()
  posts.value = data
})
</script>

<style scoped>
.team-recruit-board-page {
  position: relative;
  min-height: 100vh;
  background-color: #fafafa;
}

.page-container {
  position: relative;
  padding: 2rem 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.content-wrapper {
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 4.5rem;
}

.post-list {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
