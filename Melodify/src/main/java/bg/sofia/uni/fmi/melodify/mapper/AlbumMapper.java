package bg.sofia.uni.fmi.melodify.mapper;

import bg.sofia.uni.fmi.melodify.dto.AlbumDto;
import bg.sofia.uni.fmi.melodify.dto.GenreDto;
import bg.sofia.uni.fmi.melodify.model.Album;
import bg.sofia.uni.fmi.melodify.model.Genre;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Collection;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ArtistMapper.class})
public interface AlbumMapper {
    AlbumMapper INSTANCE = Mappers.getMapper(AlbumMapper.class);

    @Mapping(source = "artists", target = "artistDtos")
    AlbumDto toDto(Album albumEntity);

    @Mapping(source = "artistDtos", target = "artists")
    Album toEntity(AlbumDto albumDto);

    List<AlbumDto> toDtoCollection(Collection<Album> albumEntities);

    List<Album> toEntityCollection(Collection<AlbumDto> albumDtos);
}
