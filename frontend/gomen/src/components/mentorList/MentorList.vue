<template>
  <div class="mentor-list-page px-6 py-8 max-w-7xl mx-auto">
    <!-- 타이틀 -->
    <div class="text-center mb-10">
      <img src="@/assets/icon-fire.png" alt="hot" class="mx-auto w-12 mb-2" />
      <h1 class="text-3xl font-bold mb-2">멘토 리스트</h1>
      <h2 class="text-red-600 text-xl font-extrabold">지금 가장 HoT한 멘토와!</h2>
      <p class="mt-2 text-sm text-gray-500">
        실제 멘티들의 <span class="text-yellow-500 font-bold">솔직한 별점</span>과
        <span class="text-blue-500 font-bold">생생한 리뷰</span>를 보고 신청해보세요!
      </p>
      <div class="flex justify-center mt-4">
        <img src="@/assets/icon-basic-user.png" class="w-14 rounded-full mx-2" />
        <img src="@/assets/icon-basic-user.png" class="w-14 rounded-full mx-2" />
      </div>
      <div class="text-yellow-400 text-xl mt-2">★★★★★</div>
    </div>

    <!-- 검색창 -->
    <div class="mb-8">
      <input
        type="text"
        placeholder="관심직무를 입력해보세요"
        class="w-full border border-gray-300 rounded-full px-5 py-3 shadow focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>

    <!-- 전체 멘토 리스트 -->
    <h3 class="text-lg font-semibold mb-4">전체 멘토</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MentorCard
        v-for="mentor in mentors"
        :key="mentor.id"
        :mentor="mentor"
      />
    </div>

    <!-- 페이지네이션 -->
    <div class="flex justify-center mt-10 space-x-2 text-sm">
      <button class="px-2 text-gray-600 hover:underline">이전</button>
      <button v-for="page in 5" :key="page" class="px-2 hover:underline">{{ page }}</button>
      <button class="px-2 text-gray-600 hover:underline">다음</button>
    </div>
  </div>
</template>

<script>
import MentorCard from './MentorCard.vue'
import userIcon from '@/assets/icon-basic-user.png'

export default {
  name: 'MentorList',
  components: { MentorCard },
  data() {
    return {
      mentors: [
        {
          id: 1,
          name: '진유림',
          title: '10년차 백엔드 개발자',
          skills: 'Java, Spring, Python, Vue, React, Linux, DB, AI',
          description: '다양한 실무 경험을 바탕으로 취업과 개발 실력을 함께 키워드립니다.',
          image: userIcon,
          rating: 5.0
        },
        {
          id: 2,
          name: '홍의정',
          title: '3년차 인공지능 엔지니어',
          skills: 'Swift, Combine',
          description: 'Python 기반의 AI 모델 개발 및 Swift 앱 연동 경험을 보유하고 있어요.',
          image: userIcon,
          rating: 5.0
        },
        {
          id: 3,
          name: '한우현🔥🔥',
          title: '3년차 백엔드 개발자',
          skills: 'Java, Spring',
          description: '꼼꼼한 코드 리뷰와 커뮤니케이션으로 멘티 여러분을 도와드립니다.',
          image: userIcon,
          rating: 5.0
        },
        {
          id: 4,
          name: '박혜진💡',
          title: 'AI 개발자',
          skills: 'PyTorch',
          description: 'PyTorch 기반의 딥러닝 모델을 연구하며 실무 적용 경험도 풍부합니다.',
          image: userIcon,
          rating: 5.0
        }
      ]
    }
  }
}
</script>

<style scoped>
.mentor-list-page {
  background-color: #f9f9f9;
  min-height: 100vh;
}
</style>