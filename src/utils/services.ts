import api from './api'

const services = {
  getAll: () => api.get('/tutorials'),
  get(id: string) {
    return api.get(`/tutorials/${id}`)
  },
  create(data: unknown) {
    return api.post('/tutorials/', data)
  },
  update(id: string, data: unknown) {
    return api.put(`/tutorials/${id}`, data)
  },
  delete(id: string) {
    return api.delete(`/tutorials/${id}`)
  },
  deleteAll() {
    return api.delete('/tutorials')
  },
  findByTitle(title: string) {
    return api.get(`/tutorials?title=${title}`)
  }
}

export default services
