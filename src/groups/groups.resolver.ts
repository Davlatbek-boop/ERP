import { GroupsService } from "./groups.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Group } from "./entities/group.entity";

@Resolver("groups")
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Query(() => [Group])
  findAllGroup() {
    return this.groupsService.findAll();
  }

  @Query(() => Group)
  findOneGroup(@Args("id", { type: () => ID }) id: number) {
    return this.groupsService.findOne(+id);
  }

  @Mutation(() => Group)
  createGroup(@Args("createGroup") createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Mutation(() => Group)
  updateGroup(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateGroup") updateGroupDto: UpdateGroupDto
  ) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Mutation(() => Number)
  removeGroup(@Args("id", { type: () => ID }) id: number) {
    return this.groupsService.remove(+id);
  }
}
