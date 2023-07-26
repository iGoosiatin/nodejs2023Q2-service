import { Injectable } from '@nestjs/common';
import { TrackDto } from './dto/track.dto';
import { InMemoryDatabaseService } from 'src/in-memory-database/in-memory-database.service';
import { Track } from 'src/common/interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private dbService: InMemoryDatabaseService) {}

  async findAll() {
    const tracks = await this.dbService.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    const track = await this.dbService.track.findUnique(id);
    return track;
  }

  async create(trackDto: TrackDto) {
    const track = await this.dbService.track.create(trackDto);
    return track;
  }

  async update(track: Track, trackDto: TrackDto) {
    const updatedTrack = await this.dbService.track.update({
      ...track,
      ...trackDto,
    });
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.dbService.track.delete(id);
    return !!track;
  }
}
