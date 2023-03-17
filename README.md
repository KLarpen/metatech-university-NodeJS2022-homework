# Metatech University. NodeJS 2022 Homework
Homework project in [Metatech University](https://github.com/metatech-university/)'s NodeJS 2022-23 course.

The actual packages code placed in the `JavaScript` directory. There is iterative folders structure to persist separate steps during working on different groups of session tasks. The first such directory `9-logger` is unmodified version of example materials to the course from [HowProgrammingWorks/DDD](https://github.com/HowProgrammingWorks/DDD/tree/session) repository's `session` branch. `db` directory are from the same example origin and contains dev environment setup. **UPD:** single common `db` directory has been moved to every step folder due to content difference starting from the `d-tasks2-messenger` step.

## Tasks #2 (custom domain choice explained)
**Custom domain that has been chosen:** parking network for EV with warranty of available electric charger on the spot.

More details in the [d-tasks2-messenger/README](./JavaScript/d-tasks2-messenger/README.md).

## Next development step
Next task was to split application layers into separate repositories: for system and domain. The goal behind the splitting decision is to explicitly build framework agnostic application structure that might be launched with different system layer runners (i.e. application servers) which itself might be based on different frameworks, libraries etc. On the other side, system layer code becomes an application server that able to launch different domain layer applications.

#### Result you may find in repositories:
- [metatech-university-NodeJS2023-SystemLayer-Pure](https://github.com/KLarpen/metatech-university-NodeJS2023-SystemLayer-Pure)
- [metatech-university-NodeJS2023-Application-prisma](https://github.com/KLarpen/metatech-university-NodeJS2023-Application-prisma) (based on `prisma` branch of the current repository)

All following tasks will be done in the aforementioned repositories.
