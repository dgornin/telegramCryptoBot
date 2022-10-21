import unittest
from unittest.mock import AsyncMock
from bot_main import start as bot_start
from bot_main import regular_choice, received_information, received_information2


class TestMain(unittest.IsolatedAsyncioTestCase):
    def setUp(self):
        self.updater = AsyncMock()
        self.updater.effective_chat.id = 0
        self.updater.message.text = "🌐 Make on-chain note"
        self.context = AsyncMock()

    async def test_start(self):
        self.assertEqual(0, await bot_start(self.updater, self.context))

    async def test_regular_choice_1(self):
        self.updater.message.text = "🌐 Make on-chain note"
        self.assertEqual(0, await regular_choice(self.updater, self.context))

    async def test_regular_choice_2(self):
        self.updater.message.text = "🔗 In blockchain notes"
        self.assertEqual(1, await regular_choice(self.updater, self.context))

    async def test_regular_choice_3(self):
        self.updater.message.text = "💿 Local notes"
        self.assertEqual(1, await regular_choice(self.updater, self.context))

    async def test_regular_choice_4(self):
        self.updater.message.text = "🖊 Make local note"
        self.assertEqual(1, await regular_choice(self.updater, self.context))

    async def test_regular_choice_5(self):
        self.updater.message.text = "test"
        self.assertEqual(1, await regular_choice(self.updater, self.context))

    async def test_received_information_1(self):
        self.updater.message.text = "test"
        self.context.user_data = {"choice": "🔗 In blockchain notes"}
        self.assertEqual(0, await received_information(self.updater, self.context))

    async def test_received_information_2(self):
        self.updater.message.text = "test"
        self.context.user_data = {"choice": "💿 Local notes"}
        self.assertEqual(0, await received_information(self.updater, self.context))

    async def test_received_information_3(self):
        self.updater.message.text = "test"
        self.context.user_data = {"choice": "🖊 Make local note"}
        self.assertEqual(3, await received_information(self.updater, self.context))

    async def test_received_information2_1(self):
        self.updater.message.text = "test"
        self.context.user_data = {"choice": "🖊 Make local note", "adr": "test"}
        self.assertEqual(0, await received_information2(self.updater, self.context))


if __name__ == "__main__":
    unittest.main()
