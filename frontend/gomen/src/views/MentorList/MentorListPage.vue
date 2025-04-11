<template>
  <div class="mentor-list-page">
    <MentorTitle />
    <MentorHighlight />
    <MentorSearch @search="handleSearch" />

    <h2 class="section-title">전체 멘토</h2>
    <MentorList :mentors="paginatedMentors" />

    <MentorPagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:page="handlePageChange"
    />
  </div>
</template>

<script>
import axios from 'axios'
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
      itemsPerPage: 4
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
      this.currentPage = newPage
    }
  },
  mounted() {
    axios.get('http://localhost:3001/mentors').then((res) => {
      this.mentors = res.data
      this.filteredMentors = res.data
    })
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
</style>
