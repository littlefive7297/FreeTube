import { defineComponent } from 'vue'
import FtFlexBox from '../ft-flex-box/ft-flex-box.vue'
import SideNavMoreOptions from '../side-nav-more-options/side-nav-more-options.vue'
import { youtubeImageUrlToInvidious } from '../../helpers/api/invidious'

export default defineComponent({
  name: 'SideNav',
  components: {
    'ft-flex-box': FtFlexBox,
    'side-nav-more-options': SideNavMoreOptions
  },
  computed: {
    isOpen: function () {
      return this.$store.getters.getIsSideNavOpen
    },
    backendFallback: function () {
      return this.$store.getters.getBackendFallback
    },
    backendPreference: function () {
      return this.$store.getters.getBackendPreference
    },
    currentInvidiousInstance: function () {
      return this.$store.getters.getCurrentInvidiousInstance
    },
    profileList: function () {
      return this.$store.getters.getProfileList
    },
    activeProfile: function () {
      return this.$store.getters.getActiveProfile
    },
    activeSubscriptions: function () {
      const subscriptions = JSON.parse(JSON.stringify(this.activeProfile.subscriptions))

      subscriptions.sort((a, b) => {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })

      if (this.backendPreference === 'invidious') {
        subscriptions.forEach((channel) => {
          channel.thumbnail = youtubeImageUrlToInvidious(channel.thumbnail, this.currentInvidiousInstance)
        })
      }

      return subscriptions
    },
    hidePopularVideos: function () {
      return this.$store.getters.getHidePopularVideos
    },
    hidePlaylists: function () {
      return this.$store.getters.getHidePlaylists
    },
    hideTrendingVideos: function () {
      return this.$store.getters.getHideTrendingVideos
    },
    hideActiveSubscriptions: function () {
      return this.$store.getters.getHideActiveSubscriptions
    },
    hideLabelsSideBar: function () {
      return this.$store.getters.getHideLabelsSideBar
    },
    hideText: function () {
      return !this.isOpen && this.hideLabelsSideBar
    },
    applyNavIconExpand: function() {
      return {
        navIconExpand: this.hideText
      }
    },
    applyHiddenLabels: function() {
      return {
        hiddenLabels: this.hideText
      }
    }
  }
})
