import type { GroupedCollabs } from '@/types/GroupedCollabs'
import { groupedProfilesQuery, type Projects, type TaskWithProjects } from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []

    return data
  }

  const getGroupedCollabs = async (items: Projects | TaskWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)
    const promises = filteredItems.map(async (item) => {
      return getProfilesByIds(item.collaborators)
    })
    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollabs,
    groupedCollabs
  }
}
