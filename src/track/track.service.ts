import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TrackService {
  constructor(private dbService: DatabaseService) {}

  async findAll() {
    const tracks = await this.dbService.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique({ where: { id } });
    return track;
  }

  async create(data: TrackDto) {
    const track = await this.dbService.track.create({ data });
    return track;
  }

  async update(id: string, data: TrackDto) {
    try {
      const updatedTrack = await this.dbService.track.update({
        where: { id },
        data,
      });
      return updatedTrack;
    } catch {
      return null;
    }
  }

  async remove(id: string) {
    try {
      await this.dbService.track.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
