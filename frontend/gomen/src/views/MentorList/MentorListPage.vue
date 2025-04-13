<template>
  <div class="mentor-list-page">
    <MentorTitle />
    <MentorHighlight />
    <div class="search-and-buttons">
      <MentorSearch @search="handleSearch" />

      <div class="mentor-button-wrapper" v-if="isMentor">
        <button class="status-btn" :class="{ active: isRegistered }">신청 현황</button>
        <button class="register-btn" @click="goToRegister" :disabled="isRegistered">
          등록하기
        </button>
      </div>
    </div>

    <h2 class="section-title">전체 멘토</h2>
    <MentorList :mentorlist="paginatedMentors" />

    <MentorPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script>
import api from '@/api'
import MentorTitle from '@/components/mentorList/MentorTitle.vue'
import MentorHighlight from '@/components/mentorList/MentorHighlight.vue'
import MentorSearch from '@/components/mentorList/MentorSearch.vue'
import MentorList from '@/components/mentorList/MentorList.vue'
import MentorPagination from '@/components/mentorList/MentorPagination.vue'

export default {
  name: 'MentorListPage',
  components: {
    MentorTitle,
    MentorHighlight,
    MentorSearch,
    MentorList,
    MentorPagination
  },
  data() {
    return {
      mentors: [],
      filteredMentors: [],
      currentPage: 1,
      itemsPerPage: 4,
      isMentor: false,
      isRegistered: false
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredMentors.length / this.itemsPerPage)
    },
    paginatedMentors() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.filteredMentors.slice(start, start + this.itemsPerPage)
    }
  },
  methods: {
    handleSearch(keyword) {
      this.currentPage = 1;
      const lowerKeyword = keyword.toLowerCase();

      this.filteredMentors = this.mentors.filter((mentor) => {
        const name = mentor.name?.toLowerCase() || "";
        const title = mentor.title?.toLowerCase() || "";
        const skills = mentor.skills?.toLowerCase() || "";

        return (
          name.includes(lowerKeyword) ||
          title.includes(lowerKeyword) ||
          skills.includes(lowerKeyword)
        );
      });
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
    },
    goToRegister() {
      this.$router.push('/mentorlist/add') 
    }
  },
  mounted() {
  // 멘토 리스트 불러오기
  api.get('/mentorlist').then((res) => {
    const reversed = res.data.slice().reverse()
    this.mentors = reversed
    this.filteredMentors = reversed
  }).catch((err) => {
    console.error('멘토 리스트 조회 실패:', err)
  })

  // ✅ 사용자 정보 localStorage에서 직접 가져오기
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.isMentor === 'Y') {
      this.isMentor = true
      this.isRegistered = localStorage.getItem('mentorRegistered') === 'true'
    }
  } catch (e) {
    console.warn('로그인 사용자 정보 없음 또는 파싱 실패')
    }
  }
}
</script>

<style scoped>
.mentor-list-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin: 32px 0 20px;
  color: #222;
}

.search-and-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mentor-button-wrapper button {
  margin-left: 8px;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.status-btn {
  background-color: #e0e0e0;
  color: #333;
}

.register-btn {
  background-color: #7364ff;
  color: white;
}

.register-btn:disabled {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}

.status-btn.active {
  background-color: #5d5fef;
  color: white;
}
</style>
