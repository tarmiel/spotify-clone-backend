import Section from '../models/section-model.js';
import sectionService from '../service/section-service.js';

class SectionConroller {
  async getHomeSections(req, res, next) {
    try {
      const { search, jobStatus, jobType, sort } = req.query;

      const sections = await sectionService.getPreviewSections();

      return res.status(200).json(sections);
    } catch (e) {
      next(e);
    }
  }
  async getShortsSection(req, res, next) {
    try {
      const id = req.user.id;
      const shortsSection = await sectionService.getShortsSection(id);

      return res.status(200).json(shortsSection);
    } catch (e) {
      next(e);
    }
  }
  async getPreviewSections(req, res, next) {
    try {
      const previewSections = await sectionService.getPreviewSections();

      return res.status(200).json(previewSections);
    } catch (e) {
      next(e);
    }
  }
}

export default new SectionConroller();
