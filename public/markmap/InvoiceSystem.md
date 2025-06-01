# Proyecto-Facturas

## frontend/

### pages/
- users/
  - users-home.component.ts
  - user-list.component.ts
  - user-edit.component.ts
  - login.component.ts
- ownership/
  - ownership-register.component.ts
  - ownership-list.component.ts
  - ownership-home.component.ts
  - ownership-edit.component.ts
- owners/
  - owners-register.component.ts
  - owners-list.component.ts
  - owners-home.component.ts
  - owners-edit.component.ts
- estates/
  - estates-register.component.ts
  - estates-list.component.ts
  - estates-home.component.ts
  - estates-edit.component.ts
- clients/
  - clients-register.component.ts
  - clients-list.component.ts
  - clients-home.component.ts
  - clients-edit.component.ts
- bills/
  - bills-register.component.ts
  - bills-list.component.ts
  - bills-home.component.ts
  - bills-edit.component.ts
- dashboard/
  - dashboard.component.ts

### core/services/
- validator-services/
  - user-validator.service.ts
  - estates-validator.service.ts
  - clients-validator.service.ts
- user-services/
  - user.service.ts
- owners-ship-services/
  - owners-ship.service.ts
- owners-services/
  - owners.service.ts
- estates-services/
  - estates.service.ts
- clients-services/
  - clients.service.ts
- bills-services/
  - bills.service.ts
- auth-service/
  - auth.service.ts
- api-service/
  - api.service.ts

### Otros
- app.component.ts
- README.md

---

## backend/

### src/services/
- usersServices.js
- ownersServices.js
- estatesServices.js
- estatesOwnersServices.js
- clientsServices.js
- billsServices.js

### src/repository/
- usersRepository.js
- ownersRepository.js
- estatesRepository.js
- estatesOwnersRepository.js
- clientsRepository.js
- billsRepository.js

### src/controllers/
- usersController.js
- ownersControllers.js
- estatesOwnersController.js
- estatesControllers.js
- clientsControllers.js
- billsControllers.js
- authController.js

### src/middlewares/
- role.js
- auth.js

### src/helpers/
- stringHelpers.js
- calculateTotal.js

### src/errors/
- index.js

### Otros
- docker-compose.yml
- README.md
